import React, { useCallback, useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Link, useNavigate } from 'react-router-dom';
import Pagination from 'react-js-pagination';
import '../UI/paging.css';

// 상단 그림
import background2 from '../../assets/background2.png';
// 준비중 그림
import setting from '../../assets/setting.jpg';
// 공통부분
import { Container, Row, Col, Figure } from 'react-bootstrap';
import PageNav from '../UI/pageNav';
import SideBar from '../UI/sideBar';
import Footer from '../UI/footer';

// import GalleryBoardList from './galleryBoardList';
import { useDispatch, useSelector } from 'react-redux';
import { LOAD_GALLERY_POSTS_REQUEST } from '../../reducers/post';

function museumCourseBoardView() {
  // 페이지 버튼 눌린 상태로 만드려고 생성
  const [currentPage, setCurrentPage] = useState('박물관 코스'); // 현재 페이지 상태
  const { admin } = useSelector((state) => state.admin);
  const { gallery } = useSelector((state) => state.post);
  const dispatch = useDispatch();

  // 페이지네이션
  const [page, setPage] = useState(1);
  const [currentPosts, setCurrentPosts] = useState([]);
  const indexOfLastPost = page * 10;
  const indexOfFirstPost = indexOfLastPost - 10;
  const handlePageChange = (page) => {
    setPage(page);
  };
  useEffect(() => {
    setCurrentPosts(gallery.slice(indexOfFirstPost, indexOfLastPost));
  }, [gallery, indexOfFirstPost, indexOfLastPost, page]);

  useEffect(() => {
    dispatch({
      type: LOAD_GALLERY_POSTS_REQUEST,
    });
  }, []);

  // 사이드바 내용
  const buttons = [
    { label: '옥순봉 코스', href: '/board/oksunbongPeakCourse' },
    { label: '청풍호 코스', href: '/board/cheongpunghoCourse' },
    { label: '박물관 코스', href: '/board/museumCourse' },
    { label: '배론성지 코스', href: '/board/shrineOfBaeronCourse' },
    { label: '힐링 코스', href: '/board/healingCourse' },
  ];

  return (
    <>
      {/* 네비바 수정 */}
      <Container
        fluid
        style={{ height: '80px', width: '98vw' }}
        className="container-fluid mx-0 px-0 "
      >
        <PageNav />
      </Container>
      {/* 상단이미지 */}
      <Container
        fluid
        style={{ height: '40vh', width: '98vw', overflowX: 'hidden' }}
        className="container-fluid m-0 p-0"
      >
        <div
          style={{
            backgroundImage: `url(${background2})`,
            height: '37vh',
            width: '100vw',
            backgroundSize: 'cover',
            backgroundRepeat: 'no-repeat',
            backgroundPosition: 'center',
            display: 'flex',
            justifyContent: 'center', // 가로 방향 가운데 정렬
            alignItems: 'center', // 세로 방향 가운데 정렬
          }}
        >
          <h1 style={{ color: 'white' }}>테마/코스</h1>
        </div>
      </Container>
      <Container
        fluid
        style={{ width: '98vw', overflowX: 'hidden' }}
        className="container-fluid m-0 p-0"
      >
        <Row>
          {/* 사이드바 */}
          <Col xs={12} lg={3} sm={3} className="px-0">
            <SideBar buttons={buttons} title={'테마/코스'} />
          </Col>
          {/* 제목 */}
          <Col xs={12} lg={9} sm={9}>
            <Col xs={12} lg={12} sm={12}>
              <h3>박물관 코스</h3>
              <hr />
            </Col>

            <Col xs={12} lg={12} sm={12}>
              <Figure>
                <Figure.Image src={setting} alt="Setting Image" />
              </Figure>
            </Col>
          </Col>
        </Row>
      </Container>
      {/* 푸터 */}
      <Container
        fluid
        style={{ width: '98vw', overflowX: 'hidden' }}
        className="container-fluid mx-0 p-0"
      >
        <Footer />
      </Container>
    </>
  );
}

export default museumCourseBoardView;
