import Head from "next/head"
import React from "react"

export const Login = () => {
  return (
    <main className="section">
      <Head>
        <title>Login</title>
      </Head>

      <div className="box ">
        <p className="title">Bienvenido</p>
        <div className="field">
          <label className="label">Usuario</label>
          <p className="control has-icons-left has-icons-right">
            <input className="input" type="email" placeholder="Email" />
            <span className="icon is-small is-left"></span>
          </p>
        </div>
        <div className="field">
          <label className="label">Contraseña</label>
          <p className="control has-icons-left">
            <input className="input" type="password" placeholder="Password" />
            <span className="icon is-small is-left"></span>
          </p>
        </div>
        <div className="field">
          <p className="control">
            <button className="button is-success">Acceder</button>
          </p>
        </div>
      </div>
    </main>
  )
}
