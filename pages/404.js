import Head from "next/head"
import React from "react"

export default function Custom404Page() {
  return (
    <section className="hero is-fullheight">
      <Head>
        <title>Page not found</title>
      </Head>

      <div className="hero-body">
        <div className="container has-text-centered">
          <p className="title is-size-1">404</p>
          <p className="subtitle">Página no encontrada</p>
          <div className="">
            <a className="is-link" href="/">
              Ir a Trabajos
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
