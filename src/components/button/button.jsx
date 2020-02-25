import React from 'react'
import Commons from '../commons/commonsUI'
import './css/style.css'

/**
 * Metodo para generar botones
 * @param  { Object } props
 * @return { React-Component}
 */
export default class Button extends Commons {
  render() {
    try {
      const { type, id, className, disabled, onClick, children } = this.props
      return (
        <button type={type} id={id} className={className} disabled={disabled} onClick={onClick}>
          {children}
        </button>
      )
    } catch (e) {
      // Lanzamos el mensaje de error
      console.error(e.stack)
      return null
    }
  }
}
