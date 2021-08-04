const Cash = (props) => (
  <div>{props.title} {props.cash <= 0 ? "" : (props.cash / props.ratio * 2).toFixed(2)}</div>
)


class ExchangeCounter extends React.Component {

  static defaultProps = {

    currencies: [
      {
        id: 0,
        name: 'zloty',
        ratio: 1.0,
        title: 'Wartosc w zlotowkach'
      },
      {
        id: 1,
        name: 'dollar',
        ratio: 3.6,
        title: 'Wartosc w dolarach'
      },
      {
        id: 2,
        name: 'euro',
        ratio: 4.1,
        title: 'Wartosc w euro'
      },
      {
        id: 3,
        name: 'pound',
        ratio: 4.7,
        title: 'Wartosc w funtach'
      },
      {
        id: 4,
        name: 'nok',
        ratio: 4.4,
        title: 'Wartosc w NOK'
      }
    ],
    prices: {
      electricity: .51,
      gas: 4.76,
      oranges: 3.79
    }
  }



  state = {
    amount: "",
    product: "gas"
  }

  handleChange = e => {
    this.setState({
      amount: e.target.value
    })
  }

  handleSelect = e => {
    this.setState({
      product: e.target.value,
      amount: ''
    })
  }

  insertSuffix(select) {
    if (select === 'electricity') return <em>kwh</em>
    else if (select === 'gas') return <em>litr</em>
    else if (select === 'oranger') return <em>kg</em>
    else return null;
  }

  selectPrice(select) {
    const price = this.props.prices[select];
    return price;
  }

  render() {

    const price = this.selectPrice(this.state.product);

    const calculators = this.props.currencies.map(currency => (
      <Cash
        key={currency.id}
        name={currency.name}
        ratio={currency.ratio}
        title={currency.title}
        cash={this.state.amount}
        price={price} />
    ))

    return (
      <div className="app">
        <label>Wybierz produkt:
          <select value={this.state.product} onChange={this.handleSelect}>
            <option value="electricity">Prad</option>
            <option value="gas">Gaz</option>
            <option value="oranges">Pomarancze</option>
          </select>
        </label>
        <br />
        <label>
          <input type="number" value={this.state.amount} onChange={this.handleChange} />
          {this.insertSuffix(this.state.product)}
        </label>
        {calculators}
      </div>
    )
  }
}

ReactDOM.render(<ExchangeCounter />, document.getElementById('root'));