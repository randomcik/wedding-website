 "use client";

import { PassCanvas } from "@/components/PassCanvas";
import { MobilePassFlip } from "@/components/MobilePassFlip";
import { useEffect, useState } from "react";
export default function Home() {
  const [name, setName] = useState("");
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const nameParam = urlParams.get("name");

    if (nameParam) setName(nameParam.replace(/\+/g, " ").trim());
  }, []);
  return (
    <div className="page">
      <header className="hero">
        {name && <p className="kicker">Pentru</p>}
        <h1 className="names">
          {name}
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
