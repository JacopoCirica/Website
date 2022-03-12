function rewardShortPath(env){
    let n = env.length
    let m = env.length
    let distance = []
    //Initialize all distances to infinity(max)
    for (let i = 0;i <n; i++) {
        let distI = []
        for (let j = 0; i<m; j++) {
            distI.push(Infinity);
        }
        distance.push(distI);
    }
    let shortest = Infinity;
    let reward = Infinity;
    let x = 0;
    let y = 0;
    //find the position of A in the env
    for (let i = 0; i<env.length; i++) {
        for(let j =0; j< env[i].length; j++) {
            if(env[i][j] === 'A') {
                x = i;
                y = j;
            }
        }
    }

    //Using depth-first search to get all possible paths
    function depth_first_search(i,j,len,temp_reward) {
        //make sure the cell is within the env

        if (i>=0 && i<n && j>=0 && j<m) {
            let item = env[i][j];
            if (item!=='X' && len<=distance[i][j]) {
                distance[i][j] = len;

                if(item === 'B') {
                    if (len < shortest) {
                        shortest = len;
                        reward = temp_reward;
                    }else if (len === shortest) {
                        reward = Math.max(temp_reward,reward)
                    }
                }else if (item === 'R') {
                    depth_first_search(i-1,j,len+1,temp_reward+1);
                    depth_first_search(i+1,j,len+1,temp_reward+1);
                    depth_first_search(i,j+1,len+1,temp_reward+1);
                    depth_first_search(i,j-1,len+1,temp_reward+1);
                }else {
                    depth_first_search(i-1,j,len+1,temp_reward);
                    depth_first_search(i+1,j,len+1,temp_reward);
                    depth_first_search(i,j+1,len+1,temp_reward);
                    depth_first_search(i,j-1,len+1,temp_reward);
                }
            }
        }
    }

    depth_first_search(x, y, 0, 0)
    return [shortest, reward]
}
let env = [['A','X','R','R','R'],['O','O','O','X','B'],['O','O','O','O','R']]
console.log(rewardShortPath(env))