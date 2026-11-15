import React from 'react';
export function Link({to,href,children,...props}:any){return <a href={href||to||'#'} {...props}>{children}</a>}
export function useNavigate(){return ({to}:any)=>{if(to)window.location.assign(to)}}
export function useRouter(){return {navigate:({to}:any)=>{if(to)window.location.assign(to)}}}
export function createFileRoute(){return (_config:any)=>({})}
export function useParams(){return {}}
export function useSearch(){return {}}
