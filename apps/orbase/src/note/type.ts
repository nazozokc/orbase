import z from "zod";

export const MarkdownMetaSchema = z.object({
  date: z.string(),
  tags: z.string().or(z.array(z.string())),
});

export type MarkdownMeta = z.infer<typeof MarkdownMetaSchema>;
