import React from 'react'
import Commons from './components/commons/commonsUI'
import SliderAmount from './containers/sliderAmount/sliderAmount'
import SliderMonth from './containers/SliderMonth/sliderMonth'
import Button from './components/button/button'
import { convertValue } from './utils/numbers'
import './App.css'

class App extends Commons {
  state = {
    month: null,
    amount: null,
    total: 0,
    isOk: false,
    minAmount: 5000,
  }

  /**
   * @description Metodo para obtener el valor del input
   * @param { int } amount
   * @returns { Promise<Void> }
   */
  getValueAmount = async amount => {
    const newValue = amount.toString().slice(0, -2)
    await this.setStateAsync({ amount: newValue })
    await this.getTotalAmount()
  }

  /**
   * @description Metodo para obtener el valor del input
   * @param { int } month
   * @returns { Promise<Void> }
   */
  getValueMoth = async month => {
    await this.setStateAsync({ month })
    await this.getTotalAmount()
  }

  /**
   * @description Metodo que obtiene el total
   * @returns { Promise<Void>}
   */
  getTotalAmount = async () => {
    const { month, amount, minAmount } = this.state
    if (!month || !amount) {
      await this.setStateAsync({ isOk: false })
      return false
    }

    if (amount >= minAmount) {
      const total = convertValue(amount / month.toFixed(2))
      await this.setStateAsync({
        total,
        isOk: true,
      })
    }
    return true
  }

  onClickButtonCredit = () => {
    alert('Credito')
  }

  onClickViewDues = () => {
    alert('Cuotas')
  }

  render() {
    const { isOk, total } = this.state

    return (
      <div className="App">
        <div className="container">
          <div className="title">Simulá tu Crédito</div>
          {/* Seccion del slider de monto */}
          <SliderAmount getAmount={amount => this.getValueAmount(amount)} />
          {/* Seccion del slider de plazo */}
          <SliderMonth getMonth={month => this.getValueMoth(month)} />
          {/* Seccion de total */}
          <div className="total-amount">
            <div>CUOTA FIJA POR MES </div>
            <div className="amount">{`${total}`}</div>
          </div>
          {/* Seccion de botones */}

          <div className="buttons-container">
            <Button
              className={isOk ? 'success' : 'disabled'}
              type="button"
              disabled={!isOk}
              onClick={() => this.onClickButtonCredit()}
            >
              OBTENÉ CRÉDITO
            </Button>
            <Button className="detai" disabled={!isOk} onClick={() => this.onClickViewDues()}>
              VER DETALLE DE CUOTA
            </Button>
          </div>
        </div>
      </div>
    )
  }
}

export default App
