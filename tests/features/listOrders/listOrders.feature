Feature: Deve listar os pedidos da fila

  Scenario: Deve listar todos os pedidos da fila
    Given inicio a listagem da fila sem pedidos na fila
    Then deve retornar 0 itens
