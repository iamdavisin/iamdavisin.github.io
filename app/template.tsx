/* Transición suave al cambiar de página (/, /projects, /cv).
   En CSS para que el contenido se vea sin esperar al JavaScript. */
export default function Template({ children }: { children: React.ReactNode }) {
    return <div className="page-enter">{children}</div>;
}
