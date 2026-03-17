export default function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="w-full py-4 border-t bg-white/3 backdrop-blur-sm">
      <div className="mx-auto">
        <p className="text-center text-xl text-muted-foreground">
          © {currentYear} Kuba Walczak
        </p>
      </div>
    </footer>
  )
}
