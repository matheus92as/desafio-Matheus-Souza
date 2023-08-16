import { menu } from "./catalogo";

class CaixaDaLanchonete {
  calcularValorDaCompra(metodoDePagamento, itens) {
    const lowerMetodo = metodoDePagamento.toLowerCase();

    const valorItens = itens.map((item) => {
      const lowerItem = item.toLowerCase();
      const separa = lowerItem.split(",");

      const itemSeparado = separa[0];
      const quantiaSeparada = Number(separa[1]);

      const findItem = menu.filter((pedido) => {
        return pedido.codigo === itemSeparado;
      });

      if (quantiaSeparada === 0) {
        return "Quantidade inválida!";
      } else if (findItem.length === 0) {
        return "Item inválido!";
      } else if (findItem.length > 0) {
        if (findItem[0].extra === true) {
          const principal = findItem[0].principal;
          const findPrincipal = itens.filter((item) => {
            const lowerPrincipal = item.toLowerCase();
            const separa = lowerPrincipal.split(",");
            const principalSeparado = separa[0];

            return principal === principalSeparado;
          });

          if (findPrincipal.length === 0) {
            return "Item extra não pode ser pedido sem o principal";
          } else {
            const valor = quantiaSeparada * findItem[0].valor;
            return valor;
          }
        } else {
          const valor = quantiaSeparada * findItem[0].valor;
          return valor;
        }
      }
    });

    if (itens.length === 0) {
      return "Não há itens no carrinho de compra!";
    } else if (
      lowerMetodo !== "dinheiro" &&
      lowerMetodo !== "debito" &&
      lowerMetodo !== "credito"
    ) {
      return "Forma de pagamento inválida!";
    } else {
      let valorTotal = 0;
      let resultado;
      const validaTotal = valorItens.filter((resp) => {
        return typeof resp === "string";
      });

      let metodo = 0;

      if (metodoDePagamento === "dinheiro") {
        metodo = 0.95;
      } else if (metodoDePagamento === "debito") {
        metodo = 1;
      } else if (metodoDePagamento === "credito") {
        metodo = 1.03;
      }

      if (validaTotal.length === 0) {
        valorItens.forEach((valor) => {
          valorTotal = valorTotal + valor;
        });

        const total = ((valorTotal * metodo) / 100).toFixed(2);

        resultado = `R$ ${total.toString().replace(".", ",")}`;
      } else {
        resultado = validaTotal[0];
      }

      return resultado;
    }
  }
}

export { CaixaDaLanchonete };
