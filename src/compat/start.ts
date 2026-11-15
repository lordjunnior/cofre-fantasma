export function createServerFn(){let handler:any;const chain:any={inputValidator(){return chain},validator(){return chain},middleware(){return chain},handler(fn:any){handler=fn;return async (args:any={})=>handler({data:args.data??args,...args})}};return chain}

export function getRequestHeader(){return undefined}
