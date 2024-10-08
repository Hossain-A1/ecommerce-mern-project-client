import {FadeLoader} from "react-spinners"; 

function Loading({loading}) {

  return (
    <div
      className='loading-container'
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
      }}
    >
      <FadeLoader
        color={"#36D7B7"}
        loading={loading}
        size={40} 
        aria-label='Loading Spinner'
        data-testid='loader'
      />
    </div>
  );
}

export default Loading;
