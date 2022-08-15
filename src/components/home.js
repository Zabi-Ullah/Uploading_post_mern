import { Helmet } from "react-helmet";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import Authhome from "../Auth/AuthHome";
import Pagi_Home from "./Pagin_Home";
import Moment from "react-moment";

const Home = () => {
  const { loading, all_post, count, perpage } = useSelector(
    (e) => e.AuthReducer
  );
  const [seepost, setSeepost] = useState(false);
  const { page } = useParams();
  if (page === undefined) {
    page = 1;
  }
  const dispatch = useDispatch();
//   const sethtml = (html) => {
//     const texts = html.map(convert);
//     console.log(texts.join("\n"));
//   };
  useEffect(() => {
    dispatch(Authhome(page));
    if (loading) {
      setSeepost(true);
    } else {
      setSeepost(false);
    }
  }, [page, dispatch]);
  return (
    <>
      <Helmet>
        <meta charSet="utf-8" />
        <title>Home</title>
        <link rel="canonical" href="http:// zabiHome.com" />
      </Helmet>
      <div className="container">
        {seepost ? (
          <div className="spinner-border process text-success"></div>
        ) : (
          <div className="posts">
            {all_post.map((posts) => (
              <div className="post">
                <div>
                  <h5 className="username">{posts.userName}</h5>
                  <h1>
                    <Link className="text-body item ithome">{posts.title}</Link>
                  </h1>
                  {/* {sethtml(posts.body)} */}
                  <Moment className="date " format="YYYY/MM/DD">
                    {posts.updateAt}
                  </Moment>
                </div>
                <div>
                  <img
                    src={`/Image/uploadimage/${posts.image}`}
                    width={200}
                    height={200}
                  />
                </div>
              </div>
            ))}
          </div>
        )}
        <Pagi_Home page={page} count={count} perpage={perpage} />
      </div>
    </>
  );
};
export default Home;
