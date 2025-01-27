import React, { useCallback, useRef, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

import { useDispatch, useSelector } from 'react-redux';
import {
  ADD_POST_REQUEST,
  REMOVE_IMAGE,
  UPLOAD_IMAGES_REQUEST,
} from '../../reducers/post';
import { Link, useNavigate } from 'react-router-dom';
import useInput from '../../hooks/useInput';
import '../UI/paging.css';
import '../UI/boardUI.css';

import { backUrl } from '../../../config/config';

// 상단 그림
import background2 from '../../assets/background2.png';

// 준비중 그림
import setting from '../../assets/setting.jpg';

// 공통부분
import {
  Container,
  Row,
  Col,
  Figure,
  Form,
  Button,
  Card,
} from 'react-bootstrap';
import PageNav from '../UI/pageNav';
import SideBar from '../UI/sideBar';
import Footer from '../UI/footer';

function announceBoardWrite() {
  const { imagePaths } = useSelector((state) => state.post);
  const { admin } = useSelector((state) => state.admin);
  const [title, onChangeTitle] = useInput('');
  const [text, onChangeText] = useInput('');

  const imageInput = useRef();

  const dispatch = useDispatch();
  const navigate = useNavigate();
  // 기본적인 버그들, 게시글을 작성하기로해놓ㄱ 다 빈칸으로 두거나 알맞은 형식이 아닐땐 요청을 받지 않게끔
  const onSubmitForm = useCallback(
    (e) => {
      e.preventDefault();
      if (!admin) {
        return alert('관리자 로그인이 필요합니다.');
      }
      if (!text || !text.trim()) {
        return alert('게시글을 작성하세요');
      }
      const formData = new FormData();
      imagePaths.forEach((p) => {
        formData.append('image', p);
      });
      formData.append('title', title);
      formData.append('content', text);

      console.log(formData);
      navigate('/board/announce');

      return dispatch({
        type: ADD_POST_REQUEST,
        data: formData,
      });
    },
    [title, text, imagePaths]
  );

  const onClickImageUpload = useCallback(() => {
    imageInput.current.click();
  }, [imageInput.current]);

  const onChangeImages = useCallback((e) => {
    console.log('images', e.target.files);
    const imageFormData = new FormData();
    [].forEach.call(e.target.files, (f) => {
      imageFormData.append('image', f);
    });
    dispatch({
      type: UPLOAD_IMAGES_REQUEST,
      data: imageFormData,
    });
  }, []);
  const onRemoveImage = useCallback((index) => () => {
    dispatch({
      type: REMOVE_IMAGE,
      data: index,
    });
  });

  // 사이드바 내용
  const buttons = [
    { label: '공지사항', href: '/board/announce' },
    { label: '자주하는 질문', href: '/board/faq' },
    { label: '투어 후기', href: '/board/review' },
  ];

  return (
    <>
      {/* 네비바 수정 */}
      <Container
        fluid
        style={{
          height: '80px',
          width: '98vw',
          fontFamily: 'Pretendard-Regular',
        }}
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
          <h1 style={{ color: 'white' }}>알림마당</h1>
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
            <SideBar buttons={buttons} title={'알림마당'} />
          </Col>
          {/* 제목 */}
          <Col xs={12} lg={9} sm={9}>
            <Col xs={12} lg={12} sm={12}>
              <h3>공지사항</h3>
              <hr />
            </Col>

            <Col xs={12} lg={12} sm={12}>
              <Form
                style={{ padding: '16px' }}
                encType="multipart/form-data"
                onSubmit={onSubmitForm}
              >
                {/* 제목 */}
                <Form.Group as={Row} className="mb-3" controlId="title">
                  <Col md={2}>
                    <Card
                      className="text-center"
                      bg="success"
                      border="success"
                      text="white"
                    >
                      <Card.Header
                        style={{
                          height: '35px',
                          fontSize: '17px',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                        }}
                      >
                        제목
                      </Card.Header>
                    </Card>
                  </Col>

                  <Col md={10}>
                    <Form.Control
                      name="title"
                      type="text"
                      placeholder="제목을 입력해주세요. "
                      value={title}
                      onChange={onChangeTitle}
                      style={{ backgroundColor: '#D9D9D9' }}
                    />
                  </Col>
                </Form.Group>

                {/* 내용 */}
                <Form.Group as={Row} className="mb-3" controlId="text">
                  <Col md={2}>
                    <Card
                      className="text-center"
                      bg="success"
                      border="success"
                      text="white"
                    >
                      <Card.Header
                        style={{
                          height: '35px',
                          fontSize: '17px',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                        }}
                      >
                        내용
                      </Card.Header>
                    </Card>
                  </Col>

                  <Col md={10}>
                    <Form.Control
                      as="textarea"
                      rows={15}
                      name="text"
                      type="text"
                      placeholder="내용을 입력해주세요."
                      value={text}
                      onChange={onChangeText}
                      style={{ backgroundColor: '#D9D9D9' }}
                    />
                  </Col>
                </Form.Group>

                {/* 이미지 업로드 */}
                <Form.Group as={Row} className="mb-3" controlId="text">
                  <Col md={2}>
                    <Card
                      className="text-center"
                      bg="success"
                      border="success"
                      text="white"
                    >
                      <Card.Header
                        style={{
                          height: '35px',
                          fontSize: '17px',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                        }}
                      >
                        이미지
                      </Card.Header>
                    </Card>
                  </Col>

                  <Col md={10}>
                    <Form.Control
                      name="image"
                      type="file"
                      ref={imageInput}
                      multiple
                      onChange={onChangeImages}
                      style={{ backgroundColor: '#D9D9D9' }}
                    />
                  </Col>
                </Form.Group>
                <div>
                  {imagePaths.map((v, i) => (
                    <div key={v} style={{ display: 'inline-block' }}>
                      <img src={`${v}`} style={{ width: '200px' }} alt={v} />
                      <div>
                        <Button onClick={onRemoveImage(i)}>제거</Button>
                      </div>
                    </div>
                  ))}
                </div>

                <Col className="d-flex justify-content-end">
                  <Button
                    className="mb-4"
                    variant="success"
                    type="submit"
                    style={{ width: '100px', borderRadius: '30px' }}
                  >
                    등록
                  </Button>
                </Col>
              </Form>
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
export default announceBoardWrite;
