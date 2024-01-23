Feature: Deve retornar os pedidos da fila encontrados

  Scenario: Deve retornar o pedido da fila passando um ID existente
    Given inicio a obtenção do pedido da fila passando o id 1 como parametro
    Then o resultado deve ser de sucesso
    And deve retornar 1 item

  Scenario: Não deve retornar o pedido da fila passando um ID existente
    Given inicio a obtenção do pedido da fila passando o id 1524 como parametro
    Then o resultado deve retornar erro
    And deve retornar a mensagem de erro 'Order not found'
