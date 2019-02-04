import React, { Component } from "react";
import AutoFetch from "./AutoFetch/AutoFetch";
import Loading from "react-loading-animation";
import "./App.css";

class App extends Component {
  constructor(props) {
    super(props);

    this.state = { loading: false, done: false };

    this.rfs = {
      email: React.createRef(),
      nome: React.createRef(),
      telefone: React.createRef()
    };

    this.submit = this.submit.bind(this);
  }

  submit() {
    if (
      this.rfs.email.current.value === "" ||
      this.rfs.nome.current.value === "" ||
      this.rfs.telefone.current.value === ""
    )
      alert("Por favor preencha os campos.");
    else {
      this.setState({ loading: true });
      AutoFetch.post_code(
        "emails",
        "add",
        {
          item: {
            mailingList: "emails-validados",
            email: this.rfs.email.current.value,
            nome: this.rfs.nome.current.value,
            telefone: this.rfs.telefone.current.value
          }
        },
        () =>
          AutoFetch.post_code(
            "emails",
            "deleteOne",
            {
              key: {
                mailingList: "emails-em-bruto",
                email: this.rfs.email.current.value
              }
            },
            () => {
              this.setState({ loading: false, done: true });
              alert("Obrigado por se inscrever! Tenha um bom dia!");
            }
          )
      );
    }
  }

  render() {
    return (
      <div id="app">
        <div id="website">
          <img
            id="logo"
            alt="METALPRO"
            src="https://www.metalpro.pt/img/metalpro.png?1548948855"
          />
          <p id="title">NEWSLETTER</p>
          <p>Inscreva-se na nossa Newsletter para receber</p>
          <p>as mais recentes notícias sobre ouro</p>
          <p>e os melhores conselhos de investimento!</p>
          <fieldset
            className="red-fieldset"
            onClick={() => this.rfs.email.current.focus()}
          >
            <legend className="red-legend">Email</legend>
            <input
              className="transparent-input"
              type="text"
              ref={this.rfs.email}
            />
          </fieldset>
          <fieldset
            className="red-fieldset"
            onClick={() => this.rfs.nome.current.focus()}
          >
            <legend className="red-legend">Nome</legend>
            <input
              className="transparent-input"
              type="text"
              ref={this.rfs.nome}
            />
          </fieldset>
          <fieldset
            className="red-fieldset"
            onClick={() => this.rfs.telefone.current.focus()}
          >
            <legend className="red-legend">Telefone</legend>
            <input
              className="transparent-input"
              type="text"
              ref={this.rfs.telefone}
            />
          </fieldset>
          {this.state.done ? (
            <div />
          ) : this.state.loading ? (
            <Loading />
          ) : (
            <div id="switch" onClick={this.submit}>
              Submit
            </div>
          )}
        </div>
      </div>
    );
  }
}

export default App;
