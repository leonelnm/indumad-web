import { useState } from "react"
import { ActiveLink } from "./ActiveLink"
import { ActiveLinkIcon } from "./ActiveLinkIcon"

export const Navbar = () => {
  const [isBurguer, setIsBurguer] = useState("")

  const handleClick = () => {
    setIsBurguer((isBurguer) => (isBurguer === "is-active" ? "" : "is-active"))
  }

  return (
    <nav className="container navbar is-light">
      <div className="navbar-brand">
        <a className="navbar-item" href="/">
          <span className="icon"></span>
        </a>
        <div className={`navbar-burger ${isBurguer}`} onClick={handleClick}>
          <span></span>
          <span></span>
          <span></span>
        </div>
      </div>

      <div className="vl" />

      <div className={`navbar-menu ${isBurguer}`}>
        <div className="navbar-start">
          <ActiveLink clazz="navbar-item" href="/" text="Trabajos" />
          <ActiveLink
            clazz="navbar-item"
            href="/facturacion"
            text="Facturación"
          />
        </div>

        <div className="navbar-end is-size-5">
          <ActiveLinkIcon
            clazz="navbar-item"
            href="/calendar"
            color="#000000b3"
            text="Ver agenda"
          />

          <div className="vl" />

          <ActiveLinkIcon
            clazz="navbar-item"
            href="/notifications"
            color="#000000b3"
            text="Ver notificaciones"
          />

          <div className="vl" />

          <ActiveLinkIcon
            clazz="navbar-item"
            href="/notifications"
            color="#000000b3"
            text="Perfil"
          />
        </div>
      </div>
    </nav>
  )
}
