const express = require("express")
const axios = require("axios")
const dotenv = require("dotenv")
dotenv.config()

const router = express.Router()
const API_URL = process.env.API_URL

// Route to home page
router.get("/", async (req, res) => {
    try {
        const response = await axios.get(`${API_URL}?limit=20`)
        return res.render("pages/home", { pokemonList: response.data.results })
    } catch (error) {
        console.error("Error fetching pokemon list ", error)
        return res.status(500).json({ message: "Internal Server Error" })
    }
})

// Pokemon details
router.get("/pokemon/:name", async (req, res) => {
    try {
        const { name } = req.params
        const response = await axios.get(`${API_URL}/${name}`)
        return res.render("pages/details", { pokemon: response.data })
    } catch (error) {
        console.error("Error fetching pokemon ", error)
        return res.status(500).json({ message: "Internal Server Error" })
    }
})

// Search by pokemon
router.get("/search", async (req, res) => {
    try {
        const { name } = req.query;
        if (!name) return res.redirect("/")

        try {
            const response = await axios.get(`${API_URL}/${name.toLowerCase()}`)
            return res.render("pages/details", { pokemon: response.data })
        } catch (error) {
            return res.render("pages/noName")
        }

    } catch (error) {
        console.error("Error searching pokemon")
        return res.status(500).json({ message: "Internal Server Error" })
    }
})

module.exports = router