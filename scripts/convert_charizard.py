import json
import shutil
import struct
import subprocess
import tempfile
from pathlib import Path

src = Path(r"d:\portfolio\public\models\charizard.glb")
dst = Path(r"d:\portfolio\public\models\charizard-live.glb")
data = src.read_bytes()
magic, version, length = struct.unpack("<4sII", data[:12])
assert magic == b"glTF"

offset = 12
jlen, jtype = struct.unpack("<I4s", data[offset : offset + 8])
offset += 8
assert jtype == b"JSON"
jraw = data[offset : offset + jlen]
offset += jlen
blen, btype = struct.unpack("<I4s", data[offset : offset + 8])
offset += 8
assert btype == b"BIN\x00"
binary = bytearray(data[offset : offset + blen])
gltf = json.loads(jraw.decode("utf-8"))

tmpdir = Path(tempfile.mkdtemp(prefix="gltfwebp_"))
ff = shutil.which("ffmpeg")
if not ff:
    raise SystemExit("ffmpeg not found")

image_pngs = []
for i, img in enumerate(gltf.get("images", [])):
    bv = gltf["bufferViews"][img["bufferView"]]
    start = bv.get("byteOffset", 0)
    end = start + bv["byteLength"]
    blob = bytes(binary[start:end])
    wpath = tmpdir / f"img{i}.webp"
    ppath = tmpdir / f"img{i}.png"
    wpath.write_bytes(blob)
    subprocess.check_call(
        [ff, "-y", "-i", str(wpath), str(ppath)],
        stdout=subprocess.DEVNULL,
        stderr=subprocess.DEVNULL,
    )
    png = ppath.read_bytes()
    image_pngs.append(png)
    print(f"img {i}: webp {len(blob)} -> png {len(png)}")

new_binary = bytearray(binary)
while len(new_binary) % 4:
    new_binary.append(0)

for i, png in enumerate(image_pngs):
    start = len(new_binary)
    new_binary.extend(png)
    while len(new_binary) % 4:
        new_binary.append(0)
    bv_index = len(gltf["bufferViews"])
    gltf["bufferViews"].append(
        {"buffer": 0, "byteOffset": start, "byteLength": len(png)}
    )
    gltf["images"][i] = {
        "mimeType": "image/png",
        "bufferView": bv_index,
        "name": gltf["images"][i].get("name", f"Image_{i}"),
    }

gltf["extensionsUsed"] = [
    e for e in gltf.get("extensionsUsed", []) if e != "EXT_texture_webp"
]
gltf["extensionsRequired"] = [
    e for e in gltf.get("extensionsRequired", []) if e != "EXT_texture_webp"
]
if not gltf["extensionsUsed"]:
    gltf.pop("extensionsUsed", None)
if not gltf.get("extensionsRequired"):
    gltf.pop("extensionsRequired", None)

gltf["buffers"][0]["byteLength"] = len(new_binary)

jbytes = json.dumps(gltf, separators=(",", ":")).encode("utf-8")
while len(jbytes) % 4:
    jbytes += b" "

total = 12 + 8 + len(jbytes) + 8 + len(new_binary)
out = bytearray()
out += struct.pack("<4sII", b"glTF", 2, total)
out += struct.pack("<I4s", len(jbytes), b"JSON")
out += jbytes
out += struct.pack("<I4s", len(new_binary), b"BIN\x00")
out += new_binary
dst.write_bytes(out)
print(
    "wrote",
    dst,
    "size",
    len(out),
    "used",
    gltf.get("extensionsUsed"),
    "req",
    gltf.get("extensionsRequired"),
)
shutil.rmtree(tmpdir, ignore_errors=True)
