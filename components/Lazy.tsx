import useMounted from "@/hooks/useMounted";

interface LazyProps {
  children: React.ReactNode,
}

const Lazy = ({children} : LazyProps) => {
  const mounted = useMounted();
  
  return (
    <>
      {mounted ? children : <></>}
    </>
  )
}

export default Lazy;