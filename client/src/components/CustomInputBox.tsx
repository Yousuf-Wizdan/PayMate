interface inputProps{
    reference?: any,
    title: string,
    type: 'text' | 'password',
    placeholder?: string
}
function CustomInputBox({reference , title , type , placeholder}: inputProps){
    return(
        <div className="flex flex-col mt-6">
                    <div className="text-lg font-bold">
                        {title}
                    </div>
                    <div className="border border-slate-300 rounded-lg mt-1 min-w-80">
                        <input ref={reference} className="p-2  min-w-full outline-none" type={type} placeholder={placeholder} />
                    </div>
            </div>
    )
}

export default CustomInputBox