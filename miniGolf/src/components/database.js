var database = {
  methods: {
    init: function () {
      var database = window.sqlitePlugin.openDatabase({
        name: 'arch.db',
        location: 'default'
      })
      database.transaction(function (transaction) {
        transaction.executeSql('CREATE TABLE IF NOT EXISTS jogador' +
        ' (idj INTEGER PRIMARY KEY   AUTOINCREMENT, name, score)')
      })
      database.transaction(function (transaction) {
        transaction.executeSql('CREATE TABLE IF NOT EXISTS buraco' +
      ' (idc INTEGER PRIMARY KEY  AUTOINCREMENT, numeroburaco, score, id)')
      })
      database.transaction(function (transaction) {
        transaction.executeSql('CREATE TABLE IF NOT EXISTS vencedores' +
      ' (idv INTEGER PRIMARY KEY  AUTOINCREMENT, name, score, id)')
      })
      return database
    },
    insertJogador: function (database, name, score) {
      database.transaction(function (tx) {
        var query = 'INSERT INTO jogador (name, score) VALUES (?, ?)'
        tx.executeSql(query, [name, score])
      })
    },
    insertVencedor: function (database, name, score, id) {
      database.transaction(function (tx) {
        var query = 'INSERT INTO vencedores (name, score, id) VALUES (?, ?, ?)'
        tx.executeSql(query, [name, score, id])
      })
    },
    insertBuraco: function (database, numeroburaco, score, id) {
      database.transaction(function (tx) {
        var query = 'INSERT INTO buraco (numeroburaco, score, id) VALUES (?, ?, ?)'
        tx.executeSql(query, [numeroburaco, score, id])
      })
    },
    delete: function (database, id) {
      database.transaction(function (tx) {
        var query = 'DELETE FROM jogador WHERE idj = ?'
        tx.executeSql(query, [id], function (tx, res) {
        })
      })
    },
    deleteAll: function (database) {
      database.transaction(function (tx) {
        var query = 'DELETE FROM jogador'
        tx.executeSql(query, [], function (tx, res) {
        })
      })
    },
    update: function (database, id, score) {
      database.transaction(function (tx) {
        var query = 'UPDATE jogador SET score = ? WHERE idj = ?'
        tx.executeSql(query, [score, id], function (tx, res) {
        })
      })
    }
  }
}
export default database
