import {NextAuthOptions} from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials";


export const authOptions: NextAuthOptions = {
    providers: [
        CredentialsProvider({
            id: "credentials",
            name: "Crendentials",
            credentials: {
                username: { label: "Email", type: "text" },
                password: { label: "Password", type: "password" }
              },
              async authorize(credentials: any): Promise<any>{
                await dbConnect() 
                try {
                    await Use
                } catch (err: any) {
                    throw new Error(err)
                }
              }
        })
    ]
}