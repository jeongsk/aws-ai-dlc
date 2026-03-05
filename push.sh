#!/bin/bash
set -e

# 원격 저장소 추가
git remote add origin https://github.com/jeongsk/aws-ai-dlc.git 2>/dev/null || echo "Remote origin already exists"

# 모든 변경사항 스테이징
git add .

# 커밋
git commit -m "Initial commit: AIDLC workshop setup"

# 푸시
git push -u origin main
