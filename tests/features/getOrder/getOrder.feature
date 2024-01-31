Feature: Deve retornar os pedidos da fila encontrados

  Scenario: Não deve retornar o pedido da fila passando um ID inexistente
    Given inicio a obtenção do pedido da fila passando o id '1524' como parametro
    Then o resultado deve retornar erro
    And deve retornar a mensagem de erro 'Order not found'
