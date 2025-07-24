
export const FintaNavbar = () => {
    const links = [
        {
            title: "Thala Technologies",
            href: "/"
        },
        {
            title: "Founders",
            href: "#"
        },
         {
            title: "Guide",
            href: "#"
        },
        {
            title: "Pricing",
            href: "#"
        },
        {
            title: "Log In",
            href: "#"
        },
    ]
    return (
        <div className="navbar-root">
            <div className="logo">{links[0].title}</div>
            <div className="links">{links.slice(1).map((link, idx)=> (
                <a className="link-items" key={idx} href={link.href}>{link.title}</a>
            ))}
            <button className="btn">Start free trail</button>
            </div>
        </div>
    )
}