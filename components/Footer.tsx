export default function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer id="contact" className="border-ui-t-glass w-full scroll-mt-20 py-4 bg-glass backdrop-blur-ui">
      <div className="mx-auto">
        <p className="text-center text-xl text-muted-foreground">
          © {currentYear} Kuba Walczak
        </p>
      </div>
    </footer>
  )
}
