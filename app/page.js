"use client"
import { useRouter } from "next/navigation";

export default  function Home() {

  let router = useRouter()
  function routeHnadler(){
    router.push('/login')
  }
  return (
    <>
      <button onClick={routeHnadler}>click login page</button>
    </>
  );
}
