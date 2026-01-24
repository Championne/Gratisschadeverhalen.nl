import { Metadata } from "next"
import { BlogContent } from "./blog-content"

export const metadata: Metadata = {
  title: "Blog",
  description: "Lees onze artikelen over autoschade verhalen, het Europees Schadeformulier, en alles wat u moet weten over het claimen van schade bij de tegenpartij.",
}

export default function BlogPage() {
  return <BlogContent />
}
