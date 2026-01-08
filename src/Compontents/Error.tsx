import type React from "react";


//children es un prop especial de react para pasar los mensajes
export default function Error({children} : {children:React.ReactNode}) {
  return (
    <p className="text-center my-4 bg-red-600 text-white font-bold p-3 uppercase text-sm">{children}</p>
  )
}
