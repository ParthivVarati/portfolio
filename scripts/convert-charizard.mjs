import { NodeIO } from "@gltf-transform/core";
import { ALL_EXTENSIONS } from "@gltf-transform/extensions";
import { dedup, prune } from "@gltf-transform/functions";
import sharp from "sharp";

const input = "public/models/charizard.glb";
const output = "public/models/charizard-live.glb";

const io = new NodeIO().registerExtensions(ALL_EXTENSIONS);
const doc = await io.read(input);

for (const texture of doc.getRoot().listTextures()) {
  const img = texture.getImage();
  if (!img) continue;
  const png = await sharp(Buffer.from(img)).png().toBuffer();
  texture.setImage(new Uint8Array(png));
  texture.setMimeType("image/png");
}

for (const ext of [...doc.getRoot().listExtensionsUsed()]) {
  if (ext.extensionName === "EXT_texture_webp") ext.dispose();
}

await doc.transform(dedup(), prune());
await io.write(output, doc);
console.log("wrote", output);
