
export const tokens = {
  card: {
    base: "relative w-full h-full bg-gradient-to-br from-black/60 to-black/40 hover:from-primary/10 hover:to-secondary/10 border border-gray-800 hover:border-primary/50 transition-all duration-300",
    interactive: "group cursor-pointer",
    header: "p-6 space-y-2",
    content: "p-6 space-y-4"
  },
  button: {
    neon: "relative group border text-foreground rounded-xl bg-blue-500/5 hover:bg-blue-500/0 border-blue-500/20",
    action: "bg-primary/10 hover:bg-primary/20 text-white border border-primary/20 rounded-xl px-6 py-2.5 transition-all duration-300",
    ghost: "text-gray-400 hover:text-white transition-colors"
  },
  text: {
    title: "text-2xl font-semibold text-white",
    subtitle: "text-lg text-gray-300",
    body: "text-gray-300",
    label: "text-primary/80 mb-1"
  }
} as const;
