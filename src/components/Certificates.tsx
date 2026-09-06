import type { Certificate } from '../data/types'

export function Certificates({ certificates }: { certificates: Certificate[] }) {
  return (
    <section id="certificates">
      <h2>CERTIFICATES</h2>

      <div className="grid">
        {certificates.map((cert) => (
          <article className="cert-card" key={cert.pdf}>
            <a
              className="preview"
              href={cert.pdf}
              target="_blank"
              rel="noopener noreferrer"
              tabIndex={-1}
              aria-hidden="true"
            >
              {cert.preview ? (
                <img src={cert.preview} alt="" loading="lazy" decoding="async" />
              ) : (
                <span className="preview-fallback">PDF</span>
              )}
            </a>

            <div className="cert-head">
              <h3>{cert.title}</h3>
              {cert.date && <span className="cert-date">{cert.date}</span>}
            </div>

            <p className="muted cert-desc">{cert.desc}</p>

            <div className="cert-links">
              <a
                className="cert-link"
                href={cert.pdf}
                target="_blank"
                rel="noopener noreferrer"
              >
                Открыть PDF →
              </a>
              {cert.repo && (
                <a
                  className="cert-link"
                  href={cert.repo}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Репозиторий →
                </a>
              )}
            </div>
          </article>
        ))}
      </div>
    </section>
  )
}
