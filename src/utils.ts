@import "tailwindcss";

@theme {
  --color-sg-yellow: #FFD200;
  --color-sg-dark: #0A0A0A;
  --color-sg-gray: #1A1A1A;
}

@layer base {
  body {
    @apply bg-sg-dark text-white font-sans;
  }
}

.glass {
  @apply bg-white/5 backdrop-blur-md border border-white/10;
}

.sg-gradient {
  background: radial-gradient(circle at top right, rgba(255, 210, 0, 0.1), transparent);
}
