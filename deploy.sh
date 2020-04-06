umask 002
if [ "$NOPULL" == "true" ]; then
    echo "NOPULL is set to true, skipping stash/pull"
else
    echo "Doing stash/pull, run deploy with NOPULL=true to skip"
    git stash
    git pull
fi

cd frontend
npm i
PUBLIC_URL=/cse410/deldev/frontend/build/ npm run build
