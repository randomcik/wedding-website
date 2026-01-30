import { PassCanvas } from "@/components/PassCanvas";
import { MobilePassFlip } from "@/components/MobilePassFlip";

export default function Home() {
  return (
    <div className="page">
      <header className="hero">
        <p className="kicker">Pentru</p>
        <h1 className="names">
          DANIELA &amp; ION
          <br className="names-break" />
          CASIANOV
        </h1>
      </header>

      <section className="pass-wrap">
        <div className="pass-desktop">
          <PassCanvas />
        </div>
        <div className="pass-mobile">
          <MobilePassFlip />
        </div>
      </section>

      <footer className="footer">
        <div className="divider" />
        <p className="footer-text">
          Confirmarea prezenței sau un mesaj pentru miri pot fi transmise aici:
        </p>
        <a
          className="footer-button"
          href="https://docs.google.com/forms/d/e/1FAIpQLSdsNjeD21wTcDkOT_yM6PSbFGVqx6plrw3HOu1y3E6g-279Vg/viewform?usp=dialog"
          aria-label="Contacteaza-ne"
          target="_blank"
          rel="noreferrer"
        >
          <img
            className="footer-button-img"
            src="/confirm%20Button.svg"
            alt="Contacteaza-ne"
            draggable={false}
          />
        </a>
      </footer>
    </div>
  );
}
