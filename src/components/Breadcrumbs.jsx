import { Link, useLocation } from "react-router-dom";
import { ChevronRight, Home } from "lucide-react";

const Breadcrumbs = () => {
    const location = useLocation();
    const pathnames = location.pathname.split("/").filter((x) => x);

    if (location.pathname === "/") return null;

    return (
        <nav className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-slate-400 mb-6">
            <Link to="/" className="flex items-center gap-1 hover:text-gov-blue transition-colors">
                <Home size={12} /> Portal Home
            </Link>
            {pathnames.map((value, index) => {
                const last = index === pathnames.length - 1;
                const to = `/${pathnames.slice(0, index + 1).join("/")}`;

                return (
                    <div key={to} className="flex items-center gap-2">
                        <ChevronRight size={12} />
                        {last ? (
                            <span className="text-gov-navy dark:text-white font-black">{value.replace(/-/g, " ")}</span>
                        ) : (
                            <Link to={to} className="hover:text-gov-blue transition-colors">
                                {value.replace(/-/g, " ")}
                            </Link>
                        )}
                    </div>
                );
            })}
        </nav>
    );
};

export default Breadcrumbs;
