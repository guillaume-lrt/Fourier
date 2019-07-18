// Add n intermediate points to increase accuracy and slow down the speed


function distance(a,b){
  return ((a[0]-b[0])**2+(a[1]-b[1])**2)**0.5;
}

function get_coordinates(a,b,n){
  let res = [];
  let temp = [(a[0]-b[0])/(n+1)+b[0],(a[1]-b[1])/(n+1)+b[1]];
  if (distance(temp,a) <= distance(temp,b)){   //get the points align in the right order
    for (let i = 1; i <= n; i++){
      res.push({x:int(((a[0]-b[0])*i/(n+1)+b[0])*1000)/1000,y:int(((a[1]-b[1])*i/(n+1)+b[1])*1000)/1000});
    }
  }
  else{
    for (let j = n; j >= 1; j -= 1){
      res.push({x:int(((a[0]-b[0])*j/(n+1)+b[0])*1000)/1000,y:int(((a[1]-b[1])*j/(n+1)+b[1])*1000)/1000});
    }
  }
  return res;
}

function get_all_inter_coord(A_aux,n){
  let A = [];
  for (let i = 0;i<A_aux.length;i++){
    A.push([-A_aux[i][0]+100,-A_aux[i][1]+100]);  //center the drawing and make it upward (optinal step)
  }

  let result = [];
  for (let i = 0; i<(A.length-1);i++){
    result.push({x:A[i][0],y:A[i][1]});
    result = result.concat(get_coordinates(A[i],A[i+1],n));   //add n points between A[i] and A[i+1] in result
  }

  result.push({x:A[A.length-1][0],y:A[A.length-1][1]});
  return result;
}
