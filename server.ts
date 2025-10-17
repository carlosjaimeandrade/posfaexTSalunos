import 'dotenv/config'
import app from './src/app'

const PORT: string | undefined = process.env.PORT

app.listen(PORT, () => {
    console.log(`servidor rodando na portal ${PORT}`)
})