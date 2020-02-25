import React from 'react'
import Slider from 'rc-slider'
import Commons from '../commons/commonsUI'
import 'rc-slider/assets/index.css'
import { convertValue } from '../../utils/numbers'

export default class SliderComponent extends Commons {
  state = {
    value: this.props.value ? this.props.value : 50,
    min: this.props.min ? this.props.min : 0,
    max: this.props.max ? this.props.max : 50000,
    marks: this.props.marks ? this.props.marks : null,
  }

  /**
   * @description Metodo que detecta el cambio en la slider
   * @param { INT } value
   * @returns { Promise<Void> }
   */
  onSliderChange = async value => {
    await this.setStateAsync({ value })
  }

  /**
   * @description Metodo que retorna al container el valor
   * @param { INT } value
   * @returns { Object }
   */
  onAfterChange = value => {
    this.props.returnValueChanged({
      value,
      maskValue: convertValue(value),
    })
  }

  /**
   * @description Metodo nativo de react
   * @param {*} prevProps
   */
  componentDidUpdate(prevProps) {
    const { min } = this.state
    if (prevProps !== this.props) {
      if (this.props.value >= min) {
        const newValue = this.props.type ==='amount' ? this.props.value.toString().slice(0, -2) : this.props.value

        this.setState({
          value: newValue,
          maskValue: this.props.maskValue ? this.props.maskValue : this.state.maskValue,
        })
      }
    }
  }

  render() {
    const { marks, min, max, value } = this.state
    return (
      <div>
        <Slider
          value={value}
          onChange={this.onSliderChange}
          onAfterChange={this.onAfterChange}
          defaultValue={0}
          marks={marks}
          min={min}
          max={max}
          trackStyle={{ backgroundColor: 'white', height: 5 }}
          handleStyle={{
            borderColor: 'white',
            height: 20,
            width: 20,
            marginLeft: -5,
            marginTop: -8,
            backgroundColor: 'white',
          }}
        />
      </div>
    )
  }
}
