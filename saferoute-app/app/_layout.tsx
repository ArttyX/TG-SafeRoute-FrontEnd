import "@/global.css" // Importação do CSS global
import { GluestackUIProvider } from "@/components/ui/gluestack-ui-provider" // Provider do Gluestack - garante que o Gluestack funcione corretamente em todo o app
import { Slot } from "expo-router" // Importação do Slot do Expo Router - Esse slot será o conteúdo das telas que será inserido no meio do layout

export default function Layout() {
    return (
        <GluestackUIProvider>
            <Slot />
        </GluestackUIProvider>
    )
}