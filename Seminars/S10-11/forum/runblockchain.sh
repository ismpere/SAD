
CHAINDIR="sadcahin"
CHAINNAME=sadcahin
CHAINPORT=7741

rm -r $CHAINDIR
mkdir $CHAINDIR

multichain-util create $CHAINNAME --datadir=$CHAINDIR
multichaind $CHAINNAME --datadir=$CHAINDIR --rpcuser=$CHAINNAME --rpcpassword=$CHAINNAME --rpcport=$CHAINPORT --sendfreetransactions & PID=$!; sleep 5

#node "$TESTDIR/test.js"


#kill -9 $PID
#rm -r $CHAINDIR