const express = require('express')
const app = express()

/**Import Base de données */
const pool = require('../services/database')

const adminController = {

    deleteMessage: async (req, res, next) => {

        try {

            const id_message = req.params.id

            const sql = "DELETE FROM messages WHERE id = ?"

            const [deleteMessage] = await pool.query(sql, id_message)

            return res
                .status(200)
                .json({message: "Message supprimé avec succés"})
                .end()

        } catch (error) {
            console.log(error)
        }
    },

    updateUser: async (req, res, next) => {
        try {

            var id_user = req.params.id

            var array = req.body

            var newArray = []

            for (const [key, value] of Object.entries(array)) {
                newArray.push(` ${key} = '${value}' `)
            }

            if (newArray.length === 0)
                return

            const sql = `UPDATE users SET ${newArray} WHERE id = '${id_user}'`

            const sqlUpdateUser = await pool.query(sql)

            return res
                .status(400)
                .json({message: "Utilisateur mis à jour"})
                .end

        } catch (error) {
            console.log(error)
        }
    }
}

module.exports = adminController