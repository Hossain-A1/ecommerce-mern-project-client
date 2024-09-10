import ProductSidebar from "../components/ProductSidebar";


const Home = ({setProfileModal}) => {

  return (
    <div className='flex-space-around' onClick={()=>setProfileModal(false)}>
      <div className="sidebar-container">
        <ProductSidebar/>
      </div>
      <div className="main-container">
      <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Odio praesentium accusantium rem atque id quod delectus alias expedita nam, ut corporis est facere ducimus, neque amet voluptate consectetur iusto iste!</p>
      </div>
   
    </div>
  )
}

export default Home