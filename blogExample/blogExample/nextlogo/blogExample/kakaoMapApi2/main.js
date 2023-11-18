(() => {
  const _tr = (select) => document.querySelector(select);
  const mapContainer = document.getElementById('map'), // 지도를 표시할 div 
  mapOption = {
      center: new kakao.maps.LatLng(33.450701, 126.570667), // 지도의 중심좌표
      level: 3 // 지도의 확대 레벨
  };  

  // 지도를 생성합니다    
  const map = new kakao.maps.Map(mapContainer, mapOption); 

  // 주소-좌표 변환 객체를 생성합니다
  const geocoder = new kakao.maps.services.Geocoder();

  // 주소로 좌표를 검색합니다
  function postCode() {
    new daum.Postcode({
      oncomplete: function(data) {
        const { address, roadAddress, jibunAddress, zonecode } = data;
        
        //daum 우편 API에서 주소 정보를 화면에 뿌려줍니다.
        _tr('#sample_postcode').value = zonecode;
          if(roadAddress !== ''){
            _tr("#sample_address").value = roadAddress;
          } 
          else if(jibunAddress !== ''){
            _tr("#sample_address").value = jibunAddress;
          }

        // 주소로 좌표를 검색합니다
        geocoder.addressSearch(address, function(result, status) {
          // 우편번호 서비스로 위도 경도 찾기
          data = {"name": "카페 이름", "latitude": result[0], "longitude": result[1]}
          console.log(data)
          $.ajax({ //ajax로 위도 경도 및 정보를 담아서 서버로 보내기
            type: "POST",
            url: "/test",
            data: { data },
            success: function(response){
              console.log(response['msg'])
            }
          });
          
          // 정상적으로 검색이 완료됐으면 
          if (status === kakao.maps.services.Status.OK) {

              const coords = new kakao.maps.LatLng(result[0].y, result[0].x);

              // 결과값으로 받은 위치를 마커로 표시합니다
              const marker = new kakao.maps.Marker({
                  map: map,
                  position: coords
              });

              // 인포윈도우로 장소에 대한 설명을 표시합니다
              const infowindow = new kakao.maps.InfoWindow({
                  content: '<div style="width:150px;text-align:center;padding:6px 0;">카페 위치</div>'
              });
              infowindow.open(map, marker);

              // 지도의 중심을 결과값으로 받은 위치로 이동시킵니다
              map.setCenter(coords);
          } 
        });
      }
    }).open();
  };
  
  _tr('#sample').addEventListener('click', postCode)
})();
