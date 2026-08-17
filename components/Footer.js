export default function Footer() {
  return (
    <footer className="mt-auto border-t border-cream/10 bg-marquee text-cream">
      <div className="mx-auto max-w-5xl px-6 py-8 text-sm text-cream/75">
        <div className="grid gap-6 sm:grid-cols-3">
          <div>
            <p className="font-display text-base font-bold text-cream">Internet Movies Rental</p>
            <p className="mt-1">Renting the internet&apos;s movies since 2004</p>
          </div>
          <div>
            <p className="font-semibold text-gold">Contact</p>
            <p className="mt-1">(587) 555-0199</p>
            <p>support@imr-movies.com</p>
          </div>
          <div>
            <p className="font-semibold text-gold">Hours</p>
            <p className="mt-1">Open 24/7 online</p>
          </div>
        </div>
        <p className="mt-6 border-t border-cream/10 pt-4 text-xs text-cream/50">
          &copy; {new Date().getFullYear()} Internet Movies Rental Company
        </p>
      </div>
    </footer>
  );
}
