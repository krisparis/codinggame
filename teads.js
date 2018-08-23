// https://www.codingame.com/training/medium/teads-sponsored-contest
// FUNCTIONS - START.
/////// Utilities - START.
const removePersonFromArray = function(num, array) {
  var index = array.indexOf(num);
  if (index > -1) {
    array.splice(index, 1);
  }
};
const common = function(array1, array2) {
  if (!array1) { return [];}
  return array1.filter(value => -1 !== array2.indexOf(value));
};
/////// Utilities - END.

/////// GLOBAL VARIABLES - START.
const relations = new Map();
const leafNodes = [];
///////  GLOBAL VARIABLES - END.

///////  RELATION GRAPH CREATION - START.
const registerPersonfirstNeighbor = function(person, firstNeighbor) {
  if (!relations.has(person)) { // First relation involving personA.
    relations.set(person, [firstNeighbor]); // Initialize relations array.
    leafNodes.push(person);
  } else {
    relations.get(person).push(firstNeighbor);
    removePersonFromArray(person, leafNodes);
  }
};
const buildRelationGraph = function() {
  const n = readline(); // the number of adjacency relations
  let inputs, xi, yi;
  for (let i = 0; i < n; i++) {
    inputs = readline().split(' ');
    xi = parseInt(inputs[0]); // the ID of a node that is adjacent to yi.
    yi = parseInt(inputs[1]); // the ID of a node that is adjacent to xi.    
    registerPersonfirstNeighbor(xi, yi);
    registerPersonfirstNeighbor(yi, xi);
  }
};
///////  RELATION GRAPH CREATION - END.

///////  NODE REMOVALS - START.
const removeLeafNodes = function (nodesToRemove, theirNeighborRelations, leafNodes) {
    nodesToRemove.forEach(function(node) {
        relations.delete(node);
        removePersonFromArray(node, theirNeighborRelations);
        removePersonFromArray(node, leafNodes);
    });

};
const removeLeafAndSiblings  = function (leaf, neighbor) {
      const neighborRelations = relations.get(neighbor);
      const leafNodesToRemove = common(neighborRelations, leafNodes), nbRemoves = leafNodesToRemove.length;
      removeLeafNodes(leafNodesToRemove, neighborRelations, leafNodes);      
      return nbRemoves;
};
///////  NODE REMOVALS - END.

const searchForLeafNodes  = function (array) {
    for (let key  of relations.keys()) {
        if (relations.get(key).length === 1) {
            array.push(key); 
        }
    }
}
// FUNCTIONS - END.

// MAIN - START .
buildRelationGraph();
let cycle = 0, iteration = 0, nbMinSteps = 0, nbLeafNodesOfCycle = leafNodes.length, accNbNodesDeleted = 0;
// No cyclic relations, so always at least one single person.
while (leafNodes.length > 0) {
    const leaf = leafNodes[0], uniqueNeighbor =  relations.get(leaf)[0];
    if (uniqueNeighbor === undefined) {
        removePersonFromArray(leaf, leafNodes);
        accNbNodesDeleted ++;
    } else {
      accNbNodesDeleted += removeLeafAndSiblings(leaf, uniqueNeighbor);     
    }
    if (nbLeafNodesOfCycle === accNbNodesDeleted) {
        // All leaf nodes of this cycle have been removed.        
        nbMinSteps ++; 
        // Prepare next cycle.
        searchForLeafNodes(leafNodes);
        nbLeafNodesOfCycle = leafNodes.length;
        accNbNodesDeleted = 0;                
        cycle++;
    }
    iteration++;
}
print(nbMinSteps);
// MAIN - END.
