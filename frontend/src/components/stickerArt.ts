import star from "../assets/stickers/star.webp";
import pencil from "../assets/stickers/pencil.webp";
import crown from "../assets/stickers/crown.webp";
import block from "../assets/stickers/block.webp";
import plane from "../assets/stickers/plane.webp";
import laurel from "../assets/stickers/laurel.webp";
import wing from "../assets/stickers/wing.webp";
import clip from "../assets/stickers/clip.webp";

export const stickerArt = { star, pencil, crown, block, plane, laurel, wing, clip } as const;
export type StickerName = keyof typeof stickerArt;
