import { Link } from "react-router-dom";

const Pagination = (props) => {
    let totalpage = Math.ceil(props.count / props.perpage)
    let startloop = props.page
    let diff = totalpage - props.page
    if (diff <= 3) {
        startloop = totalpage - 3
    }
    let endloop = startloop + 3

    if (startloop <= 0) {
        startloop = 1
    }
    const links = () => {
        const store=[];
        for (let i = startloop; i <= endloop; i++) {
            store.push(
                <li class="page-item"><Link class="page-link" to={`/home/${i}`} >{i}</Link></li>
            )
        }
        return store
    }
    
    return totalpage ? <ul class="pagination justify-content-center pag" >
    <li class={props.page==1 ? 'page-item disabled':'page-item'}><Link class="page-link" to={`/home/${props.page-1}`} >Previous</Link></li>
    {links()}
    <li class={props.page==totalpage ? 'page-item disabled':'page-item'} ><Link class="page-link" to={`/home/${parseInt(props.page)+1}`}>Next</Link></li>
</ul>:""
}
export default Pagination