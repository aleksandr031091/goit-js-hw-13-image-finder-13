// const options = {
//   rootMargin: '50px',
//   threshold: 0.5,
// };

// const onEntry = entries => {
//   entries.forEach(entry => {
//     // тут можно писать логику для проверки вхождения
//     if (!entry.isIntersecting || serchQuery === '') {
//       return;
//     }
//     // console.log(serchQuery);
//     API.fetchImages(serchQuery, page).then(data => {
//       //   console.log(serchQuery);
//       //   console.log(data);

//       page += 1;
//       renderImages(data);
//       //   console.log(data.hits);
//     });
//     // console.log(entry);
//   });
// };

// const observer = new IntersectionObserver(onEntry, options);

// export default observer;
